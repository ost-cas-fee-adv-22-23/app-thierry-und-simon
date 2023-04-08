import {
  Button,
  ButtonColor,
  ButtonSize,
  Card,
  Header,
  HeaderType,
  Icon,
  IconType,
  Modal,
  ModalDevice,
  Textarea
} from '@smartive-education/thierry-simon-mumble'
import { useSession } from 'next-auth/react'
import { FC, useState } from 'react'
import { postMumble } from '../services/qwacker'

export const WritePost: FC = () => {
  const [text, setText] = useState('')
  const [file, setFile] = useState('')
  const [modalIsOpen, setModalOpen] = useState(false)
  const { data: session } = useSession()
  console.log(session)

  const handleSubmit = async () => {
    console.log(session?.accessToken)
    let res = await postMumble(text, file, session?.accessToken)
    console.log(res)
  }

  return (
    <div className="mb-s">
      <Card showProfileImage={true} roundedBorders={true} profileImageUrl="">
        <div className="mb-s">
          <Header type={HeaderType.h4} style={HeaderType.h4}>
            Hey, was läuft?
          </Header>
        </div>
        <Textarea placeholder="Deine Meinung zählt!" rows={5}></Textarea>
        <input
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
        </button>

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
        device={ModalDevice.desktop}
        title="Upload Image"
      >
        <h1>Modal Content</h1>
      </Modal>
    </div>
  )
}
