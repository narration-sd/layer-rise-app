import {Suspense, useState, SetStateAction, Dispatch} from 'react'
import {DocumentHandle, useDocuments} from '@sanity/sdk-react'
import {Heading, Card, Grid} from '@sanity/ui'
import {styled} from 'styled-components'

import {PostList} from './PostList'

const ScreenHeightCard = styled(Card)`
  height: 100vh;
  overflow: scroll;
`

class setStateAction<T> {
}

interface PostProps {
  setDocId: Dispatch<SetStateAction<string>>
}

export function Post(props:PostProps) {
  const [selectedPost, setSelectedPost] = useState<DocumentHandle | null>(null)

  const setPost = (post: SetStateAction<DocumentHandle<string, string, string> | null>):void => {
    setSelectedPost(post)
    console.log ('doc: ' + JSON.stringify(post))
    // @ts-expect-error
    props.setDocId(post?.documentId || 'unset')
    // props.setDocId(JSON.stringify(post))
  }

  return (
    <Grid columns={1} style={{ width: '100%'}}>
      <Card padding={4} style={{textAlign: 'center'}}>
        <Heading as='h2'>Choose your Document</Heading>
      </Card>
      <ScreenHeightCard columnStart={1} columnEnd={3} style={{maxHeight: '100vh', overflow: 'scroll'}}>
        <Suspense>
          <PostList
            // setSelectedPost={setSelectedPost}
            setSelectedPost={setPost}
            selectedPost={selectedPost}
          />
        </Suspense>
      </ScreenHeightCard>
      <ScreenHeightCard borderLeft columnStart={3} columnEnd={6} style={{maxHeight: '100vh', overflow: 'scroll'}}>
        {/* TODO: Add <PostEdit /> form */}
      </ScreenHeightCard>
    </Grid>
  )
}