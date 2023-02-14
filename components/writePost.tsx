import {
  Button,
  ButtonColor,
  ButtonSize,
  Card,
  Header,
  HeaderType,
  Icon,
  IconType,
  Textarea
} from '@smartive-education/thierry-simon-mumble'
import { FC } from 'react'

export const WritePost: FC = () => {
  return (
    <div className="mb-s">
      <Card showProfileImage={true} roundedBorders={true} profileImageUrl="">
        <div className="mb-s">
          <Header type={HeaderType.h4} style={HeaderType.h4}>
            Hey, was läuft?
          </Header>
        </div>
        <Textarea placeholder="Deine Meinung zählt!" rows={5}></Textarea>
        <div className="flex mt-xs">
          <div className="mr-s flex grow">
            <Button
              size={ButtonSize.medium}
              color={ButtonColor.slate}
              label="Bild hochladen"
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
    </div>
  )
}
