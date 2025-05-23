import {DocumentHandle, useDocumentProjection} from '@sanity/sdk-react'
import {Box, Stack, Text} from '@sanity/ui'

// import {StatusBadge} from './StatusBadge'
import {useRef} from 'react'

type FeedbackPreviewData = {
  _createdAt: string
  content: string
  author: string
  email: string
  originalStatus: string
}

export function FeedbackPreview(props: DocumentHandle) {
  const previewRef = useRef<HTMLDivElement>(null)
  const {data, isPending} = useDocumentProjection<FeedbackPreviewData>({
    ...props,
    ref: previewRef,
    projection: `{
      _createdAt,
      content,
      author,
      email,
      "originalStatus": status
    }`,
  })

  const showPlaceholder = isPending && !data

  return (
    <Stack ref={previewRef} space={3}>
      <Text size={2} weight="semibold" textOverflow="ellipsis">
        {showPlaceholder ? '...' : data.author}
      </Text>
      <Text muted size={1} textOverflow="ellipsis">
        {showPlaceholder ? '...' : data.email + ' | ' + data._createdAt.split('T')[0]}
      </Text>
      <Text size={2} textOverflow="ellipsis">
        {showPlaceholder ? '...' : data.content}
      </Text>
      <Box>
        StatusBadge
        {/*<StatusBadge status={data.originalStatus} fontSize={1} />*/}
      </Box>
    </Stack>
  )
}