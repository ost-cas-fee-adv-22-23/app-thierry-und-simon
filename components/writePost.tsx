import {
  Button,
  ButtonColor,
  ButtonSize,
  Card,
  FileUpload,
  Header,
  HeaderType,
  Icon,
  IconType,
  Modal,
  ModalDevice,
  SizeType,
  Textarea,
  User
} from '@smartive-education/thierry-simon-mumble'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FC, useEffect, useReducer } from 'react'
import { postMumble, postReply } from '../services/mutations'
import { MumbleType } from '../types/Mumble'
import { LoadingUserShimmer } from './loadingUserShimmer'
import { reducer } from '../utils/writePostReducer'

type WriteMumbleProps = {
  data: MumbleType[]
  mutateFn: any
  count?: number
  mumbleId?: string
  mumble?: MumbleType
}

export const WritePost: FC<WriteMumbleProps> = ({
  data,
  mutateFn,
  mumbleId,
  mumble
}) => {
  const session = useSession()
  const router = useRouter()
  const isReply = router.pathname.includes('/mumble/')

  const [state, dispatch] = useReducer(reducer, {
    modalIsOpen: false,
    file: null,
    text: '',
    hasError: false,
    errorMessage: '',
    showErrorMessage: false
  })

  useEffect(() => {
    dispatch({ type: 'validate_input' })
  }, [state.text, state.file])

  // used to populate optimistic data
  const userData = {
    user: {
      firstName: session?.data?.user?.firstname,
      lastName: session?.data?.user?.lastname,
      userName: session?.data?.user?.username,
      avatarUrl: session?.data?.user?.avatarUrl
    }
  }

  // for wrinting reply
  // returns optimistic data with data from state
  const getOptimisticData = () => {
    const optimisticResponse = {
      ...userData,
      text: state?.text,
      type: 'reply'
    }

    const optimisticData = {
      ...mumble,
      responses: mumble?.responses
        ? [optimisticResponse, ...mumble.responses]
        : [optimisticResponse]
    }

    return optimisticData
  }

  // for wrinting reply
  // returns populated data with real data from response
  const getPopulatedData = (response: MumbleType) => {
    const populatedDataFromResponse = {
      ...userData,
      ...response
    }

    const populatedData = {
      ...mumble,
      responses: mumble?.responses
        ? [populatedDataFromResponse, ...mumble.responses]
        : [populatedDataFromResponse]
    }

    return populatedData
  }

  const handleSubmit = async () => {
    if (state.hasError) {
      dispatch({ type: 'show_error_message' })
    } else {
      dispatch({ type: 'reset_form' })
      if (!isReply) {
        // muatation when writing new post
        await mutateFn(
          async () => {
            const newMumble = await postMumble(
              state.text,
              state.file,
              session?.data?.accessToken
            )

            newMumble.user = { ...userData.user }

            return [newMumble, ...data]
          },
          {
            optimisticUpdate: [
              {
                text: state.text,
                ...userData
              },
              ...data
            ]
          }
        )
      }
      if (isReply) {
        // muatation when writing reply to post
        await mutateFn(
          postReply(
            state.text,
            state.file,
            mumbleId,
            session?.data?.accessToken
          ),
          {
            optimisticData: getOptimisticData,
            populateCache: getPopulatedData,
            rollbackOnError: false
          }
        )
      }
    }
  }

  return (
    <div className={isReply ? 'mb-1' : 'mb-s'}>
      <Card
        showProfileImage={isReply ? false : true}
        roundedBorders={isReply ? false : true}
        profileImageUrl={session?.data?.user.avatarUrl}
      >
        <div className="mb-s">
          {isReply ? (
            !session.data?.user ? (
              <LoadingUserShimmer />
            ) : (
              <User
                type={SizeType.SM}
                userName={session?.data?.user.username}
                fullName={`${session?.data?.user.firstname} ${session?.data?.user.lastname}`}
                userImageSrc={session?.data?.user.avatarUrl}
              />
            )
          ) : (
            <Header type={HeaderType.h4} style={HeaderType.h4}>
              Hey, was läuft?
            </Header>
          )}
        </div>
        <Textarea
          placeholder={isReply ? 'Was meinst du dazu?' : 'Deine Meinung zählt!'}
          rows={5}
          onChange={(e) => {
            dispatch({ type: 'change_text', inputText: e.target.value })
          }}
          value={state.text}
        ></Textarea>

        {state.file && <p className="pb-s">Selected File: {state.file.name}</p>}
        {state.showErrorMessage && (
          <p className="pb-s text-red-400 text-center">{state.errorMessage}</p>
        )}

        <div className="flex mt-xs">
          <div className="mr-s flex grow">
            <Button
              size={ButtonSize.medium}
              color={ButtonColor.slate}
              label="Bild hochladen"
              onClick={() => dispatch({ type: 'modal_open' })}
            >
              <span className="ml-xs">
                <Icon type={IconType.upload} />
              </span>
            </Button>
          </div>

          <Button
            size={ButtonSize.medium}
            color={ButtonColor.violet}
            label={'Absenden'}
            onClick={() => handleSubmit()}
          >
            <span className="ml-xs">
              <Icon type={IconType.send} />
            </span>
          </Button>
        </div>
      </Card>

      <Modal
        isOpen={state.modalIsOpen}
        onCloseModal={() => dispatch({ type: 'cancel_upload' })}
        device={ModalDevice.mobile}
        title="Upload Image"
      >
        {!state.file ? (
          <FileUpload
            file={state.file}
            setFile={(file) =>
              dispatch({ type: 'change_file', inputFile: file })
            }
          />
        ) : (
          <p>{state.file.name}</p>
        )}

        <div className="flex mt-m">
          <div className="mr-s grow flex">
            <Button
              color={ButtonColor.slate}
              size={ButtonSize.medium}
              onClick={() => dispatch({ type: 'cancel_upload' })}
            >
              Abbrechen
            </Button>
          </div>
          <div className="grow flex">
            <Button
              color={ButtonColor.violet}
              size={ButtonSize.medium}
              onClick={() => dispatch({ type: 'modal_close' })}
            >
              Speichern
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
