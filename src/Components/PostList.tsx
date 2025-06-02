import {type DocumentHandle, useDocuments} from '@sanity/sdk-react'
import {Stack, Box, Button} from '@sanity/ui'

import {PostPreview} from './PostPreview'

type PostListProps = {
  selectedPost: DocumentHandle | null
  setSelectedPost: (post: DocumentHandle) => void
}

export function PostList({selectedPost, setSelectedPost}: PostListProps) {
  const {data, hasMore, loadMore} = useDocuments({
    filter: `_type == "post" `,
    // filter: `_type == "post"  && dateTime(_createdAt) >= dateTime(now()) - 60 * 60 * 24 * 90`,
    orderings: [{ field: '_createdAt', direction: 'desc' }],
  })

  return (
    <Stack space={2} padding={5} style={{ width: '100%' }}>
      {data?.map((post) => (
        <Box style={{ width: '100%', minWidth: 0 }}>
          <Button
            key={post.documentId}
            onClick={() => setSelectedPost(post)}
            mode={selectedPost?.documentId === post.documentId ? 'ghost' : 'bleed'}
            tone={selectedPost?.documentId === post.documentId ? 'primary' : undefined}
            width="fill"
          >
            <div style={{widths: "90%"}}>
              <PostPreview {...post} />
            </div>
          </Button>
        </Box>
      ))}
      {hasMore && <Button onClick={loadMore} text="Load more" />}
    </Stack>
  )
}


// import {type DocumentHandle, useDocuments} from '@sanity/sdk-react'
// import {Stack, Button} from '@sanity/ui'
//
// type PostListProps = {
//   selectedPost: DocumentHandle | null
//   setSelectedPost: (post: DocumentHandle) => void
// }
//
// export function PostList({selectedPost, setSelectedPost}: PostListProps) {
//   const {data, hasMore, loadMore} = useDocuments({
//     filter: `_type == "post"`,
//   })
//
//   return (
//     <Stack space={2} padding={5}>
//       {data?.map((post) => (
//         <pre key={post.documentId}>{JSON.stringify(post, null, 2)}</pre>
//       ))}
//       {hasMore && <Button onClick={loadMore} text="Load more" />}
//     </Stack>
//   )
// }