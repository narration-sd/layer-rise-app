import {Suspense, useState, SetStateAction, Dispatch} from 'react'
import {DocumentHandle, useDocuments} from '@sanity/sdk-react'
import {Card, Grid} from '@sanity/ui'
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
  const [selectedFeedback, setSelectedFeedback] = useState<DocumentHandle | null>(null)

  const setFeedback = (feedback: SetStateAction<DocumentHandle<string, string, string> | null>):void => {
    setSelectedFeedback(feedback)
    console.log ('doc: ' + JSON.stringify(feedback))
    // @ts-expect-error
    props.setDocId(feedback?.documentId || 'unset')
    // props.setDocId(JSON.stringify(feedback))
  }

  return (
    <Grid columns={1} style={{ width: '100%'}}>
      <ScreenHeightCard columnStart={1} columnEnd={3} style={{maxHeight: '100vh', overflow: 'scroll'}}>
        <Suspense>
          <PostList
            // setSelectedFeedback={setSelectedFeedback}
            setSelectedFeedback={setFeedback}
            selectedFeedback={selectedFeedback}
          />
        </Suspense>
      </ScreenHeightCard>
      <ScreenHeightCard borderLeft columnStart={3} columnEnd={6} style={{maxHeight: '100vh', overflow: 'scroll'}}>
        {/* TODO: Add <FeedbackEdit /> form */}
      </ScreenHeightCard>
    </Grid>
  )
}