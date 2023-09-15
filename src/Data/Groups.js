function getGroupList(){
  const storedGroup = localStorage.getItem('groups');
  return storedGroup === null ? [] : JSON.parse(storedGroup);
}

let groupList = getGroupList();

function addNewGroup(){
  const newGroup = {
    id: groupList.length + 1,
    points: 5,
  }
  groupList.push(newGroup);
  localStorage.setItem('groups', JSON.stringify(groupList));
}

function removeGroup(){
  groupList.pop();
  localStorage.setItem('groups', JSON.stringify(groupList));
}

function removePoint(targetGroupId, amount){
  groupList[targetGroupId - 1].points -= amount;
  console.log(`groupList[targetGroupId - 1].points: ${groupList[targetGroupId - 1].points}`)
  localStorage.setItem('groups', JSON.stringify(groupList));
}

function updateGroups(){
  return groupList;
}

function addPoint(targetGroupId, amount){
  groupList[targetGroupId - 1].points += amount;
  localStorage.setItem('groups', JSON.stringify(groupList));
}

export {
  updateGroups,
  removePoint,
  addPoint,
  removeGroup,
  addNewGroup,
  groupList,
  getGroupList,
}