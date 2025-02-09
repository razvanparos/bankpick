export let months=['01','02','03','04','05','06','07','08','09','10','11','12']


export const formatDate = (date) => {
    let splitted = date.split("-");
    return splitted.reverse().join("/");
  };