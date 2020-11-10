import React from 'react';
import { getPageTitle } from 'notion-utils';
import { NotionAPI } from 'notion-client';
import { NotionRenderer } from 'react-notion-x';
import Head from 'next/head';
import { Vika } from '@vikadata/vika';

const notion = new NotionAPI()

export const getStaticProps = async (context) => {
    const pageId = context.params.slug.split("-").join('')
    console.log(pageId)
    const recordMap = await notion.getPage(pageId)
    console.log("fetch done")
    return {
        props: {
            recordMap, pageId
        },
        revalidate: 1000
    }
}


export async function getStaticPaths() {
    Vika.auth({ token: process.env.VIKA_API_TOKEN });
    const posts = await Vika.datasheet("dst8heCvLqRbaKBpp0").all({
        viewId: "viwWbQVYN7fJT",
    })
    const { records } = posts.data;
    const res = {
        paths: records.map((record) => {
            return {
                params: {
                    slug: record.fields.id,
                },
            }
        }),
        fallback: true
    }
    return res;
}

export default function NotionPage({ recordMap, pageId }) {
    if (!recordMap) {
        return <span>{pageId}</span>
    }
    const title = getPageTitle(recordMap)
    console.log(title)
    return (
        <>
            <Head>
                <meta name='description' content='React Notion X demo renderer.' />
                <title>{title}</title>
            </Head>
            <div>
                <NotionRenderer recordMap={recordMap} fullPage={false} darkMode={false} />
            </div>
        </>
    )
}