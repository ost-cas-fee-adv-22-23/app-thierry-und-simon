import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import { Header } from '../components/header';
import {
  Button,
  ButtonColor,
  ButtonSize,
} from '@smartive-education/thierry-simon-mumble';

type PageProps = {};

export default function PageHome({}: PageProps): InferGetStaticPropsType<
  typeof getServerSideProps
> {
  return (
    <>
      <Header title='Mumble'>
        <span>Your custom network</span>
      </Header>
      <Button
        size={ButtonSize.large}
        color={ButtonColor.gradiant}
        label='Hello'
      />
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => ({
  props: { posts: require('../data/posts.json') },
});
