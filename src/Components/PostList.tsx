import {type DocumentHandle, useDocuments} from '@sanity/sdk-react'
import {Stack, Button} from '@sanity/ui'

import {PostPreview} from './PostPreview'

type FeedbackListProps = {
  selectedFeedback: DocumentHandle | null
  setSelectedFeedback: (feedback: DocumentHandle) => void
}

export function PostList({selectedFeedback, setSelectedFeedback}: FeedbackListProps) {
  const {data, hasMore, loadMore} = useDocuments({
    filter: `_type == "post" `,
    // filter: `_type == "post"  && dateTime(_createdAt) >= dateTime(now()) - 60 * 60 * 24 * 90`,
    orderings: [{ field: '_createdAt', direction: 'desc' }],
  })

  return (
    <Stack space={2} padding={5}>
      {data?.map((feedback) => (
        <Button
          key={feedback.documentId}
          onClick={() => setSelectedFeedback(feedback)}
          mode={selectedFeedback?.documentId === feedback.documentId ? 'ghost' : 'bleed'}
          tone={selectedFeedback?.documentId === feedback.documentId ? 'primary' : undefined}
        >
          <PostPreview {...feedback} />
        </Button>
      ))}
      {hasMore && <Button onClick={loadMore} text="Load more" />}
    </Stack>
  )
}


// import {type DocumentHandle, useDocuments} from '@sanity/sdk-react'
// import {Stack, Button} from '@sanity/ui'
//
// type FeedbackListProps = {
//   selectedFeedback: DocumentHandle | null
//   setSelectedFeedback: (feedback: DocumentHandle) => void
// }
//
// export function PostList({selectedFeedback, setSelectedFeedback}: FeedbackListProps) {
//   const {data, hasMore, loadMore} = useDocuments({
//     filter: `_type == "post"`,
//   })
//
//   return (
//     <Stack space={2} padding={5}>
//       {data?.map((feedback) => (
//         <pre key={feedback.documentId}>{JSON.stringify(feedback, null, 2)}</pre>
//       ))}
//       {hasMore && <Button onClick={loadMore} text="Load more" />}
//     </Stack>
//   )
// }