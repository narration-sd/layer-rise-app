import {type SanityConfig} from '@sanity/sdk'
import {SanityApp} from '@sanity/sdk-react'
import {Flex, Spinner, ThemeProvider} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import {ExampleComponent} from './ExampleComponent'

const theme = buildTheme()

function App() {
  // apps can access many different projects or other sources of data
  const sanityConfigs: SanityConfig[] = [
    {
      projectId: process.env.SANITY_STUDIO_PROJECT_ID,
      dataset: 'wut',
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
        {/* add your own components here! */}
        <h2>projectId: { sanityConfigs[0].projectId}</h2>
        <h2>dataset: { sanityConfigs[0].dataset}</h2>
        <ExampleComponent />
      </SanityApp>
    </ThemeProvider>
  );
}

export default App
