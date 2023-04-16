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
import { FC, useReducer } from 'react'
import { postMumble } from '../services/qwacker'
import { MumbleType } from '../Types/Mumble'

const reducer = function (state, action) {
  switch (action.type) {
    case 'modal_open': {
      return {
        ...state,
        modalIsOpen: true
      }
    }
    case 'modal_close': {
      return {
        ...state,
        modalIsOpen: false
      }
    }
    case 'change_text': {
      return {
        ...state,
        text: action.inputText.trim(),
        hasError: false
      }
    }
    case 'change_file': {
      return {
        ...state,
        file: action.inputFile,
        hasError: false
      }
    }
    case 'cancel_upload': {
      return {
        ...state,
        file: null,
        modalIsOpen: false
      }
    }
    case 'validate_input': {
      let hasError = false
      let errorMessage = ''

      if (state.text === '' && !state.file) {
        hasError = true
        errorMessage = 'Bitte füge ein Bild oder einen Satz hinzu.'
      }

      return {
        ...state,
        hasError,
        errorMessage
      }
    }
    default:
      return state
  }
}

type WriteMumbleProps = {
  data: MumbleType[]
  mutateFn: any
  count: number
}

export const WritePost: FC<WriteMumbleProps> = ({ data, mutateFn, count }) => {
  const session: any = useSession()
  const router = useRouter()
  const isReply = router.pathname.includes('/mumble/')

  console.log(session)

  const [state, dispatch] = useReducer(reducer, {
    modalIsOpen: false,
    file: null,
    text: '',
    hasError: false,
    errorMessage: ''
  })

  const handleSubmit = async () => {
    dispatch({ type: 'validate_input' })

    if (!state.hasError) {
      const res = await postMumble(
        state.text,
        state.file,
        session?.data?.accessToken
      )
      mutateFn([{ count: count, mumbles: [...data, res] }])
      console.log(res)
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
            <User
              type={SizeType.SM}
              userName={session?.data?.user.username}
              fullName={`${session?.data?.user.firstname} ${session?.data?.user.lastname}`}
              userImageSrc={session?.data?.user.avatarUrl}
            />
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

        {state.file && <p className="pb-s">{state.file.name}</p>}
        {state.hasError && (
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
            label="Absenden"
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
