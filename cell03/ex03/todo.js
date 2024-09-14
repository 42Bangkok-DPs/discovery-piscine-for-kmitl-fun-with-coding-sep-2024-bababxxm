document.addEventListener('DOMContentLoaded', function() {
    const ft_list = document.getElementById('ft_list');
    const newBtn = document.getElementById('newBtn');
    
    viewCookie();

    newBtn.addEventListener('click', function() {
        const newList = document.getElementById('listName').value;
        if (newList && newList.trim() !== '') {
            addNewList(newList);
            setCookie(1);
        }
    });

    function addNewList(newList) {
        const div = document.createElement('div');
        const listName = document.createElement('span');
        
        div.className = 'newList';
        listName.textContent = newList;
        listName.className = 'listName';
        div.appendChild(listName);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'removeBtn';
        removeBtn.addEventListener('click', function() {
            if (confirm('Are you sure to delete it?')) {
                ft_list.removeChild(div);
                setCookie(1);
            }
        });
        div.appendChild(removeBtn);
        ft_list.insertBefore(div, ft_list.firstChild);
    }

    function setCookie(daysToLive) {
        const date = new Date();
        const lists = Array.from(ft_list.children).map(div => div.firstChild.textContent);
        date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000));
        let expires = "expires=" + date.toUTCString();
        document.cookie = `lists=${JSON.stringify(lists)}; ${expires};`
    }

    function viewCookie() {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('lists='));
        if (cookie) {
            const lists = JSON.parse(cookie.split('=')[1]);
            lists.forEach(addNewList);
        }
    }

    console.log(document.cookie);
});
