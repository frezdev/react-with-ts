type PlausibleEvent = 'add_fox' | 'remove_fox'
type PlausibleOptions = {
  callback?: () =>  void,
  props: Record<string, string | number | undefined>
}

interface Window {
  plausible: (event: string) => void
}