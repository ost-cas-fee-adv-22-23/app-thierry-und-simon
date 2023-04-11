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
  Textarea
} from '@smartive-education/thierry-simon-mumble'
import { useSession } from 'next-auth/react'
import { FC, useEffect, useState } from 'react'
import { postMumble } from '../services/qwacker'

export const WritePost: FC = () => {
  const [text, setText] = useState('')
  const [file, setFile] = useState()
  const [modalIsOpen, setModalOpen] = useState(false)
  const { data: session } = useSession()
  console.log(session)

  useEffect(() => {
    console.log(file)
  }, [file])

  useEffect(() => {
    console.log(text)
  }, [text])

  const handleCancel = () => {
    setFile(undefined)
    setModalOpen(false)
  }

  const handleSubmit = async () => {
    console.log(session?.accessToken)

    if (text !== '' || file !== undefined) {
      const res = await postMumble(text, file, session?.accessToken)
    }
  }

  return (
    <div className="mb-s">
      <Card showProfileImage={true} roundedBorders={true} profileImageUrl="">
        <div className="mb-s">
          <Header type={HeaderType.h4} style={HeaderType.h4}>
            Hey, was läuft?
          </Header>
        </div>
        <Textarea
          placeholder="Deine Meinung zählt!"
          rows={5}
          onChange={(e) => {
            setText(e.target.value)
          }}
          value={text}
        ></Textarea>
        {/* <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          value={undefined}
        />
        <button type="submit" onClick={() => handleSubmit()}>
          submit
        </button> */}
        {file && <p>{file.name}</p>}
        <div className="flex mt-xs">
          <div className="mr-s flex grow">
            <Button
              size={ButtonSize.medium}
              color={ButtonColor.slate}
              label="Bild hochladen"
              onClick={() => setModalOpen(true)}
            >
              <span className="ml-xs">
                <Icon type={IconType.upload} color="white" />
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
              <Icon type={IconType.send} color="white" />
            </span>
          </Button>
        </div>
      </Card>

      <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalOpen}
        device={ModalDevice.mobile}
        title="Upload Image"
      >
        {!file ? (
          <FileUpload file={file} setFile={setFile} />
        ) : (
          <p>{file.name}</p>
        )}

        <div className="flex mt-m">
          <div className="mr-s grow flex">
            <Button
              color={ButtonColor.slate}
              size={ButtonSize.medium}
              onClick={() => handleCancel()}
            >
              Abbrechen
            </Button>
          </div>
          <div className="grow flex">
            <Button
              color={ButtonColor.violet}
              size={ButtonSize.medium}
              onClick={() => setModalOpen(false)}
            >
              Speichern
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
