import {Suspense, useState, useEffect} from 'react'
import {DocumentHandle, useDocuments} from '@sanity/sdk-react'
import {Card, Grid} from '@sanity/ui'
import {styled} from 'styled-components'

import {PostList} from './PostList'

const ScreenHeightCard = styled(Card)`
  height: 100vh;
  overflow: scroll;
`

export function Post() {
  const [selectedFeedback, setSelectedFeedback] = useState<DocumentHandle | null>(null)

  return (
    <Grid columns={5}>
      <ScreenHeightCard columnStart={1} columnEnd={3} style={{maxHeight: '100vh', overflow: 'scroll'}}>
        <Suspense>
          <PostList
            setSelectedFeedback={setSelectedFeedback}
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