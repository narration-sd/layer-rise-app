import { useState } from 'react'
import {type SanityConfig} from '@sanity/sdk'
import {SanityApp} from '@sanity/sdk-react'
import {Flex, Grid, Spinner, ThemeProvider} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import {Translate} from './Components/Translate'
import {Post} from './Components/Post'

const theme = buildTheme()

interface MyConfig extends SanityConfig {
  rwToken: string | undefined
}

function App() {
  // apps can access many different projects or other sources of data

  const [ currentDocId, setCurrentDocId ] = useState ('fakeId')

  const sanityConfigs: MyConfig[] = [
    {
      projectId: process.env.SANITY_APP_PROJECT_ID,
      dataset: process.env.SANITY_APP_DATASET,
      rwToken: process.env.SANITY_APP_API_READ_WRITE_TOKEN,
    }
  ]

  function Loading() {
    return (
      <Flex justify='center' align='center' width='100vw' height='fill'>
        <Spinner />
      </Flex>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <SanityApp config={sanityConfigs} fallback={<Loading />}>
        <Grid columns={[1, 2]} gap={3}>
          {/*<Post setDocId={setCurrentDocId}/>*/}
          <Translate docId={currentDocId} rwToken={sanityConfigs[0].rwToken}/>
        </Grid>
      </SanityApp>
    </ThemeProvider>
  );
}

export default App
