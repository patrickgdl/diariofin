export const makeJSONDownload = (data: Object, filename?: string) => {
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`
  const a = document.createElement("a")
  a.href = dataStr
  a.download = filename ? `${filename}.json` : "template.json"
  a.click()
}
