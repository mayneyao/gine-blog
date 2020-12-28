import Axios from 'axios';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { ColorfulTag } from '../components/colorfulTag';
import { Layout } from '../components/layout';

export const getPosts = async () => {
  const notionRes = Axios.get("https://notion-api.splitbee.io/v1/table/b8081728310b49fea0ff1d14e190b3fb")
  const posts = (await notionRes).data;
  return posts.filter(post => post.status === "published").sort((a, b) => a.public_date > b.public_date ? -1 : 0)
}

type IPostItem = {
  title: string;
  summary: string;
  publicDate: number;
  slug: string;
  tags: string[];
}

const TagList = styled.small`
    display: flex;
`;
const Article = styled.article`
    padding-bottom: 3rem;
`;


export const PostTagList = ({ publicDate, tags = [] }) => (
  <TagList>
    {
      <ColorfulTag tag={new Date(publicDate).toLocaleDateString()} color="#aaa" />
    }
    {tags.map(tag => <ColorfulTag tag={tag} href={''} />)}
  </TagList>
);

const PostItem = ({ title, summary, publicDate, slug, tags }: IPostItem) => {
  const postPath = slug.split("-").join("");
  return (
    <Article>
      <h2 >
        <Link href={`/posts/${postPath}`}>
          <a>{title}</a>
        </Link>
      </h2>
      <p>{summary}</p>
      <PostTagList tags={tags} publicDate={publicDate} />
    </Article>
  )
};

const PostList = styled.div`
  margin: 2px auto;
  max-width: 700px;
`;

const PostIndex = ({ posts = [] }) => {
  return (
    <PostList>
      {
        posts.map(post => {
          const { name: title, public_date, id: slug, desc = '', tags } = post;
          return <PostItem key={slug} tags={tags} title={title} publicDate={public_date} slug={slug} summary={desc} />
        })
      }
    </PostList>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await getPosts();
  return {
    props: { posts },
    revalidate: 1000
  }
}

PostIndex.Layout = Layout;
export default PostIndex;
