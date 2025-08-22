let info = JSON.parse(localStorage.getItem('info')) || [];
//localStorage.removeItem('info');

function getInfo() {
    const name = document.querySelector('.input-name').value;
    const birth = document.querySelector('.input-date').value;
    const country = document.querySelector('.input-country').value;
    let selectedSex = document.querySelector('input[name="sex"]:checked');
    selectedSex = selectedSex.value;
    info.push({name,birth,country, selectedSex});
    localStorage.setItem('info', JSON.stringify(info));
}
document.querySelector('.js-add').addEventListener('click', ()=> {
    getInfo();
    renderTable();
}) 


function renderTable() {
    const tableBody = document.getElementById('infoTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    info.forEach((item,index) => {
      const row = tableBody.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);
      const cell6 = row.insertCell(5);

      cell1.textContent = item.name;
      cell2.textContent = item.birth;
      cell3.textContent = item.country;
      cell4.textContent = item.selectedSex;


      const editButton = document.createElement('button');
      editButton.textContent = 'Sửa';
      editButton.addEventListener('click', () => {

        document.querySelector('.input-name').value = item.name;
        document.querySelector('.input-date').value = item.birth;
        document.querySelector('.input-country').value = item.country;
        document.querySelector(`input[name="sex"][value="${item.selectedSex}"]`).checked = true;
        
        document.querySelector('.b').innerHTML = `<button style="font-size: 15px; padding: 5px;" class="js-add">Thêm</button>
        <button style="font-size: 15px; padding: 5px;" class="js-update" onclick = "updateInfo(${index})">Cập nhật</button>`;
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Xóa';
      deleteButton.addEventListener('click', () => {
        info.splice(index, 1);
        localStorage.setItem('info', JSON.stringify(info)); 
        renderTable(); 
      });
      cell5.appendChild(editButton);
      cell6.appendChild(deleteButton);
    });
}

renderTable();
function updateInfo (index) {
  info.splice(index, 1);getInfo();localStorage.setItem('info', JSON.stringify(info));renderTable(); document.querySelector('.js-update').remove();
  document.querySelector('.input-name').value = '';
  document.querySelector('.input-date').value = '';
  document.querySelector('.input-country').value = '';
  document.querySelector(`input[name="sex"]`).checked = false;
}



