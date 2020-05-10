class Sorter {
  // Sorteer afhankelijk van welke sorteer type gebruikt wordt
  sort(data, sortField) {
    switch (sortField) {
      case "Name": {
        return data.sort((a, b) => a.name.localeCompare(b.name));
      }
      case "Series": {
        return data.sort((a, b) => a.gameSeries.localeCompare(b.gameSeries));
      }
      case "Release date": {
        return data
          .sort((a, b) => a.release.eu?.localeCompare(b.release.eu))
          .reverse();
      }
    }
  }
}

export const sorter = new Sorter();
