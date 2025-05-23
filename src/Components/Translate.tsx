import {type CurrentUser, useCurrentUser} from '@sanity/sdk-react'
import { useState, useCallback, ChangeEvent, useRef } from 'react'
import { Card, Container, Grid, /*Flex,*/ Heading,
  Inline, Radio, Button, Stack, /*Text*/} from '@sanity/ui'
import { PublishIcon } from '@sanity/icons'
import { translateAction } from '../sanity/actions/translateAction'
import {DocumentHandle, useDocumentProjection} from '@sanity/sdk-react'

interface TranslateProps {
  rwToken: string | undefined
}

interface TranslateChoice {
  id: string
  title: string
}

interface SelectedLanguages {
  from: TranslateChoice
  to: TranslateChoice
}

const langOptions:TranslateChoice[] = [
  {id: "en-US", title: "English"},
  {id: "fr-Fr", title: "Français"},
  {id: "de-DE", title: "Deutsch"},
  {id: "it-IT", title: 'Italiano'}
];

export function Translate (props: TranslateProps) {
  const user: CurrentUser | null = useCurrentUser()

  const [from, setFrom] = useState(langOptions[0].id)
  const [to, setTo] = useState(langOptions[0].id)

  const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    switch (name) {
      case 'from':
        setFrom(value)
        break
      case 'to':
        setTo(value)
        break
    }
  }/*, [to]*/)

  const handleTranslateClick = useCallback (() => {
    if (from && to && from !== to) {
      alert ('Translating...')
      // call translate agent
    }
  }, [ from ])


  return (
    <Container width={1}>
      <Stack>
        <Card padding={4} style={{textAlign: 'center'}}>
          <Heading as="h2">Translate your {user?.name} Document</Heading>
        </Card>
        <Card padding={4} style={{textAlign: 'center'}}>
          <Grid columns={[2, 3, 4]} gap={3}>
            <Heading as='h3'>From: </Heading>
            { langOptions.map ((option:TranslateChoice) => (
              <label>
                <Radio
                  checked={from === option.id}
                  name="from"
                  onChange={handleChange}
                  value= {option.id}
                /> {option.title} </label>
            ))}
          </Grid>
        </Card>
        <Card padding={4} style={{textAlign: 'center'}}>
          <Grid columns={[2, 3, 4]} gap={3}>
            <Heading as='h3'>To: </Heading>
            { langOptions.map ((option:TranslateChoice) => (
              <label>
                <Radio
                  checked={to === option.id}
                  name="to"
                  onChange={handleChange}
                  value= {option.id}
                /> {option.title} </label>
            ))}
          </Grid>
        </Card>
        <Heading>from: {from} to: {to}</Heading>
        <Card padding={4} style={{textAlign: 'center'}}>
          <Inline space={[3, 3, 4]}>
            <Button
              fontSize={[2, 2, 3]}
              icon={PublishIcon}
              padding={[3, 3, 4]}
              radius='full'
              text="Translate"
              tone="primary"
              mode = {(from && to) && from !== to ? 'default' : 'ghost'}
              onClick={handleTranslateClick}
            />
            <Button
              fontSize={[2, 2, 3]}
              // iconRight={CancelIcon}
              padding={[3, 3, 4]}
              radius="full"
              text="Cancel"
              tone="default"
              type='reset'
            />
          </Inline>
        </Card>
      </Stack>
    </Container>
  )
}
