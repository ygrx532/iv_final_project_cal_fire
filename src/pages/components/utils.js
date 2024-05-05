function AggregateDataByYear(data) {
    const result = data.reduce((acc, d) => {
    const year = d.ArchiveYear;
    if (!acc[year]) {
        acc[year] = {
          year: year, 
          totalAcresBurned:0, 
          totalInjuries: 0, 
          totalCrewsInvolved: 0, 
          totalPersonnelInvolved:0, 
          totalStructuresDestroyed:0 };
        }
        acc[year].totalAcresBurned += d.AcresBurned
        acc[year].totalInjuries += d.Injuries;
        acc[year].totalStructuresDestroyed += d.StructuresDestroyed;
        acc[year].totalCrewsInvolved += d.CrewsInvolved;
        acc[year].totalPersonnelInvolved += d.PersonnelInvolved;
        return acc;
        },{});
    return Object.values(result);
    }

function AggregateDataByCounty(data) {
    const result = data.reduce((acc, d) => {
        const county = d.Counties;
        if (!acc[county]) {
            acc[county] = {
                county: county,
                totalAcresBurned: 0,
                totalInjuries: 0,
                totalStructuresDestroyed: 0,
                totalCrewsInvolved: 0,
                totalPersonnelInvolved: 0
            };
        }
        acc[county].totalAcresBurned += d.AcresBurned;
        acc[county].totalInjuries += d.Injuries;
        acc[county].totalStructuresDestroyed += d.StructuresDestroyed;
        acc[county].totalCrewsInvolved += d.CrewsInvolved;
        acc[county].totalPersonnelInvolved += d.PersonnelInvolved;
        return acc;
    }, {});
    return Object.values(result);
    }
  


// Function to normalize the numerical attributes of each object in the data array
function NormalizeData(data) {
    // Filter out the 'year' attribute and find the min and max for each remaining attribute
    const keys = Object.keys(data[0]).filter(key => key !== 'year');
    let minMax = keys.reduce((acc, key) => ({
      ...acc,
      [key]: {
        min: Math.min(...data.map(item => item[key])),
        max: Math.max(...data.map(item => item[key]))
      }
    }), {});
  
    // Normalize each attribute in the data array excluding 'year'
    return data.map(item => {
      let normalizedItem = { year: item.year };
  
      keys.forEach(key => {
        normalizedItem[key] = 0.1+ 0.8*(item[key] - minMax[key].min) / (minMax[key].max - minMax[key].min);
      });
  
      return normalizedItem;
    });
  }

  const HandlerPosition = (value) => {
    const min = 2013;
    const max = 2019;
    return ((value - min) / (max - min)) * 90;
  };


export { AggregateDataByYear, AggregateDataByCounty, NormalizeData, HandlerPosition}

function MyComponent() {
  return <div>My Component</div>;
}

export default MyComponent;