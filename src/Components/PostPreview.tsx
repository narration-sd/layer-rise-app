import {DocumentHandle, useDocumentProjection} from '@sanity/sdk-react'
import {Box, Stack, Text} from '@sanity/ui'

// import {StatusBadge} from './StatusBadge'
import {useRef} from 'react'
import { PortableText } from '@portabletext/react';

type PostPreviewData = {
  _createdAt: string
  title: string
  body: [object],
  authorName: string
  categoryNames: Array<string>
}

export function PostPreview(props: DocumentHandle) {
  const previewRef = useRef<HTMLDivElement>(null)
  const {data, isPending} = useDocumentProjection<PostPreviewData>({
    ...props,
    ref: previewRef,
    projection: `{
      _createdAt,
      title,
      'authorName': author->name,
      'categoryNames': categories[]->title,
      body,
    }`,
  })

  const showPlaceholder = isPending && !data


  const OneLinePortableText = ({ value }) => (
    <div style={{
      width: '100%',
      minWidth: 0,
      WebkitLineClamp: 2,
      whiteSpace: 'nowrap',
      // overflow: 'hidden',
      textOverflow: 'ellipsis',
    }}>
      <PortableText value={value} />
    </div>
  );

  return (
    <Stack ref={previewRef} space={3} style={{ width: '100%', minWidth:0 }}>
      <Text size={2} weight="semibold" textOverflow="ellipsis"  >
        {showPlaceholder ? '...' : data.authorName}
      </Text>
      <Text muted size={1} textOverflow="ellipsis">
        {/*{showPlaceholder ? '...' : data.title + ' | ' + data._createdAt.split('T')[0]}*/}
        {showPlaceholder ? '...' : data.title + ' | ' + data._createdAt}
      </Text>
      <OneLinePortableText value={data.body[0]} />
      <Text size={2} weight="semibold" textOverflow="ellipsis"  >
        {showPlaceholder ? '...' : data.categoryNames.join(',')}
      </Text>
      {/*<Text size={2} textOverflow="ellipsis">*/}
      {/*  {showPlaceholder ? '...' : JSON.stringify(data.body)}*/}
      {/*</Text>*/}
      {/*<Box>*/}
      {/*  /!*StatusBadge*!/*/}
      {/*  {showPlaceholder ? '...' : JSON.stringify(data.originalStatus)}*/}
      {/*  /!*<StatusBadge status={data.originalStatus} fontSize={1} />*!/*/}
      {/*</Box>*/}
    </Stack>
  )
}