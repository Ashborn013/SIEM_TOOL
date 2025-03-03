export function extractHeaders(data: any[]): string[] {
    if (data.length === 0) return []
    const firstItem = data[0]
    return Object.keys(firstItem)
  }
  
  