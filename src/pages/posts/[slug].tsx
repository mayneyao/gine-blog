import React from 'react';
import { NotionAPI } from 'notion-client';
import { NotionRenderer } from 'react-notion-x';
import Head from 'next/head';
import { Vika } from '@vikadata/vika';
import { PostTagList } from '..';
import styled from 'styled-components';
import { Layout } from '../../components/layout';

const notion = new NotionAPI()

export const getStaticProps = async (context) => {
    const pageId = context.params.slug.split("-").join('')
    const recordMap = await notion.getPage(pageId)
    Vika.auth({ token: process.env.VIKA_API_TOKEN });//process.env.VIKA_API_TOKEN
    const posts = await Vika.datasheet("dst8heCvLqRbaKBpp0").all({
        viewId: "viwWbQVYN7fJT",
    })
    const { records } = posts.data;
    const record = records.find(record => (record.fields.id as any).split("-").join("") === context.params.slug);
    return {
        props: {
            recordMap,
            pageId,
            pageMeta: record.fields,
        },
        revalidate: 1000
    }
}


export async function getStaticPaths() {
    Vika.auth({ token: process.env.VIKA_API_TOKEN });//
    const posts = await Vika.datasheet("dst8heCvLqRbaKBpp0").all({
        viewId: "viwWbQVYN7fJT",
    })
    const { records } = posts.data;
    const res = {
        paths: records.map((record) => {
            const postSlug = (record.fields.id as any).split("-").join("");
            return {
                params: {
                    slug: postSlug,
                },
            }
        }),
        fallback: false
    }
    return res;
}

const PageHeather = styled.div`
margin: 2px auto;
max-width: 700px;
`;

function NotionPage({ recordMap, pageId, pageMeta }) {
    if (!recordMap) {
        return <span>{pageId}</span>
    }
    const { tags, title, public_date } = pageMeta;
    return (
        <>
            <Head>
                <meta name='description' />
                <title>{title}</title>
            </Head>
            <div>
                <PageHeather>
                    <h2>
                        {title}
                    </h2>
                    <PostTagList tags={tags} publicDate={public_date} />
                </PageHeather>
                <NotionRenderer recordMap={recordMap} fullPage={false} darkMode={false} />
            </div>
        </>
    )
}

NotionPage.Layout = Layout;
export default NotionPage;