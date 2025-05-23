import { client } from "../lib/client";
import { rwToken } from "../env"
import React, { useState } from 'react';
import { EarthGlobeIcon } from '@sanity/icons';

const rwClient = client.withConfig({
  token: rwToken,
});

interface TranslateChoice {
  id: string
  title: string
}

interface SelectedLanguages {
  from: TranslateChoice
  to: TranslateChoice
}

export const translateAction= async (
    docId: string,
    from:TranslateChoice,
    to: TranslateChoice,
    client,
    rwToken: string | undefined) => {

  const TranslationClient = rwClient(client)
  return translationClient.agent.action.translate({
    // Replace with your schema ID
    schemaId: "_.schemas.default",
    // Tell the client the ID of the document to use as the source.
    documentId: docId,

    // Set the operation mode
    targetDocument: { operation: "create" },
    // Set the 'from' and 'to' language
    fromLanguage: from, //{id: "en-US", title: "English"},
    // toLanguage: {id: "de-DE", title: "German"},
    toLanguage: to, // {id: "it-IT", title: "Italian"},

    // parameterized styleGuide used to tune the translation.
    styleGuide:
      "Don't translate product names, company names, " +
      "or technical terms and phrases, even if word order " +
      "would be different in the target language." +
      "Don't translate the following words or phrases: $stopWords.",
    styleGuideParams: {
      stopWords: 'heart, rhythm, disorder'
    }
  });
}

export const AgentAction = (props)=> {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const { patch } = useDocumentOperation(id, type);

  return {
    label: 'Translate Language',
    icon: EarthGlobeIcon,
    onHandle: () => setIsDialogOpen(true),
    dialog: isDialogOpen && {
      type: 'custom',
      onClose: () => setIsDialogOpen(false),
      component: (
        <TitleChoiceDialog
          onClose={() => setIsDialogOpen(false)}
          onConfirm={ async (selectedLanguages:SelectedLanguages) => {
            if (selectedLanguages) {
              const transResult = await translateAction(
                props.id,
                selectedLanguages.from,
                selectedLanguages.to,
                rwClient);
              window.alert('Translation completed: ' +
                selectedLanguages.from.title + ' to ' +
                selectedLanguages.to.title +'!');
                // + ' -- transResult: ' + JSON.stringify(transResult));

              // *todo* insert likely here a check on the the result, then a patch try to
              //  fix slug or delete-inform to retry the translation, due to Content Lake race
            }

            setIsDialogOpen(false);
          }}
        />
      ),
    },
  };
}