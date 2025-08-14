
export const ApiRoutesConstants = {
  events: {
    search: 'events/search',
    create: 'events/create',
    delete: 'events/delete/:id',
  },

  vocabularyTracker: {
    create: 'vocabulary/create',
    update: 'vocabulary/update/:id',
    search: 'vocabulary/search',
    findByWord: 'vocabulary/find-by-word/lang/:languageCode/word/:word',
    delete: 'vocabulary/delete/:id',
    generateWord: 'vocabulary/generate-word',
  }
}