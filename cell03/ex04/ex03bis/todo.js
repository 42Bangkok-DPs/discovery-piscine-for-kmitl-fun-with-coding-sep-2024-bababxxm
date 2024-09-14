$(document).ready(function() {
    loadTasks();

    $('#newBtn').click(function() {
        let task = $('#listName').val();
        if (task) {
            addTask(task);
            $('#listName').val('');
            saveTasks();
        }
    });

    $('#ft_list').on('click', '.delete-task', function() {
        $(this).parent().remove();
        saveTasks();
    });

    function addTask(task) {
        $('#ft_list').append('<div class="task">' + task + ' <button class="delete-task">Delete</button></div>');
    }

    function saveTasks() {
        let tasks = [];
        $('#ft_list .task').each(function() {
            tasks.push($(this).text().replace(' Delete', ''));
        });
        document.cookie = "tasks=" + JSON.stringify(tasks);
    }

    function loadTasks() {
        let tasks = getCookie('tasks');
        if (tasks) {
            tasks = JSON.parse(tasks);
            tasks.forEach(function(task) {
                addTask(task);
            });
        }
    }

    function getCookie(name) {
        let cookieArr = document.cookie.split(";");

        for (let i = 0; i < cookieArr.length; i++) {
            let cookiePair = cookieArr[i].split("=");

            if (name == cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
    }
});
