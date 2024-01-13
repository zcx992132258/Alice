export function CreateFontSizeOptions() {
  let num = 9
  const fontSizeOptions = Array.from({ length: 31 }).map(() => {
    const value = num += 1
    return { value, label: value }
  })
  return fontSizeOptions
}
