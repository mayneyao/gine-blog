import { Vika } from '@vikadata/vika';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const PostIndex = () => {
  const [records, setRecords] = useState([])
  useEffect(() => {
    const getRecords = async () => {
      Vika.auth({ token: 'uskMWTiTIv4cJdq5jNvipZA' });
      const posts: any = await Vika.datasheet("dst8heCvLqRbaKBpp0").all({
        viewId: "viwWbQVYN7fJT",
      })
      console.log(posts)
      setRecords(posts.data.records);
    }
    getRecords();
  }, []);

  return <div>{
    records.map(record => {
      const postPath = record.fields.id.split("-").join("")
      return <div key={postPath}>
        <Link href={`/posts/${postPath}`}>
          <a>{postPath}</a>
        </Link>
      </div>
    })
  }</div>
}

export default PostIndex;
