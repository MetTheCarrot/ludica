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

export {
  removeGroup,
  addNewGroup,
  groupList,
  getGroupList,
}