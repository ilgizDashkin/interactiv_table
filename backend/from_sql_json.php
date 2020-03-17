 <?php
    define('DB_HOST', 'localhost');
    define('DB_USER', 'kolegi');
    define('DB_PASS', '6I7z3I6k');
    define('DB_NAME', 'pov');

    if (!@mysql_connect(DB_HOST, DB_USER, DB_PASS)) {
        exit('Cannot connect to server');
    }
    if (!mysql_select_db(DB_NAME)) {
        exit('Cannot select database');
    }

    mysql_query('SET NAMES utf8');

    function search($query)
    {
        $query = trim($query);
        $query = mysql_real_escape_string($query);
        $query = htmlspecialchars($query);

        if (!empty($query)) {
            if (strlen($query) < 3) {
                $text = '<p>Слишком короткий поисковый запрос.</p>';
            } else if (strlen($query) > 128) {
                $text = '<p>Слишком длинный поисковый запрос.</p>';
            } else {
                // var_dump($query);
                $q = "SELECT * FROM `TABLE 28` WHERE `COL 1` LIKE '%$query%'"; //1 место где изменять номер таблицы

                $result = mysql_query($q);
                //   var_dump($result);
                if (mysql_affected_rows() > 0) {
                    $row = mysql_fetch_assoc($result);
                    $num = mysql_num_rows($result);

                    $text = "<div id='povrejdenia' class='container p-2'>
                <button type='button' class='btn btn-success '>По запросу <"
                        . $query . '> найдено совпадений: '
                        . "<span class='badge badge-light '>"
                        . $num . "</span>"
                        . "</button><div>";

                    do {
                        // Делаем запрос, получающий ссылки на статьи
                        $q1 = "SELECT * FROM `TABLE 28` WHERE `id` = '$row[id]'"; //2 место где изменять номер таблицы
                        $result1 = mysql_query($q1);

                        if (mysql_affected_rows() > 0) {
                            $row1 = mysql_fetch_assoc($result1);
                        }
                        //moi

                        //moi
                        $text .= "<div  class='priv'>
            <div id='kl-name' >
                                " . $row['COL 1'] . "</div>
                     <p id='kl-priv' class='bg-success'>" . $row['COL 2'] . "</p>
           </div>";
                    } while ($row = mysql_fetch_assoc($result));
                } else {
                    $text = '<p>По вашему запросу ничего не найдено.</p>';
                }
            }
        } else {
            $text = '<p>Задан пустой поисковый запрос.</p>';
        }

        return $text;
    }
    function search_new($query)
    {
        $query = trim($query);
        $query = mysql_real_escape_string($query);
        $query = htmlspecialchars($query);

        if (!empty($query)) {
            if (strlen($query) < 3) {
                $text = '<p>Слишком короткий поисковый запрос.</p>';
            } else if (strlen($query) > 128) {
                $text = '<p>Слишком длинный поисковый запрос.</p>';
            } else {
                // var_dump($query);
                $q = "SELECT * FROM `povkl` WHERE `name` LIKE '%$query%'";

                $result = mysql_query($q);
                //   var_dump($result);
                if (mysql_affected_rows() > 0) {
                    $row = mysql_fetch_assoc($result);
                    $num = mysql_num_rows($result);

                    $text = "<div class='container p-2'>
                    <button type='button' class='btn btn-success '>По запросу <"
                        . $query . '> найдено совпадений в новой базе: '
                        . "<span class='badge badge-light '>"
                        . $num . "</span>"
                        . "</button><div>";

                    do {
                        // Делаем запрос, получающий ссылки на статьи
                        $q1 = "SELECT * FROM `povkl` WHERE `id` = '$row[id]'";
                        $result1 = mysql_query($q1);

                        if (mysql_affected_rows() > 0) {
                            $row1 = mysql_fetch_assoc($result1);
                        }
                        //moi
                        //moi проверяет есть ли картинка в ответе из базы
                        // var_dump($row1['foto1']); 
                        if (!$row1['foto1']) {
                            $text_foto1 = '<tr><td></td><td>нет фото';
                        } else {
                            $text_foto1 = '<tr><td></td><td><a href="' . $row1['foto1'] . '"><img src="' . $row1['foto1'] . '"width="200"  height="200"> </a>';
                        }

                        if (!$row1['foto2']) {
                            $text_foto2 = '<tr><td></td><td>нет фото';
                        } else {
                            $text_foto2 = '<tr><td></td><td><a href="' . $row1['foto2'] . '"><img src="' . $row1['foto2'] . '"width="200"  height="200"></a>';
                        }

                        if (!$row1['foto3']) {
                            $text_foto3 = '<tr><td></td><td>нет фото';
                        } else {
                            $text_foto3 = '<tr><td></td><td><a href="' . $row1['foto3'] . '"><img src="' . $row1['foto3'] . '"width="200"  height="200"></a>';
                        }
                        //moi конец фото проверки
                        // проверяет есть ли координаты в ответе из базы
                        // var_dump($row['gps']); 
                        if (!$row['gps']) {
                            $text_gps = '<tr><td></td><td>нет координат';
                        } else {
                            $text_gps = '<tr><td>gps</td><td><a href="https://maps.google.com/?hl=ru&q=' . $row['gps'] . '">место </a>';
                        }
                        //end проверяет есть ли координаты в ответе из базы
                        //moi
                        $text .= "
      <div class='table-responsive alert alert-success'><table class='table table-bordered '>
       
       
       
             <tr><td>имя</td><td> " . $row['name']
                            . '<tr><td>дата</td><td> ' . $row['date'] .
                            '<tr><td>замер</td><td>  ' . $row['zamer'] .
                            '<tr><td>откуда замер</td><td>  ' . $row['otkuda'] .
                            '<tr><td> привязка </td><td>  ' . $row['priv'] .
                            '<tr><td> вся длинна </td><td>  ' . $row['dlinna'] .
                            // '<tr><td>gps</td><td><a href="https://maps.google.com/?hl=ru&q='.$row['gps'].'">место </a>'.
                            $text_gps .
                            '<tr><td> кто </td><td>  ' . $row['kto'] .
                            $text_foto1 . $text_foto2 . $text_foto3 .

                            '</td></tr>
      </table></div><br>';
                    } while ($row = mysql_fetch_assoc($result));
                } else {
                    $text = '<p>По вашему запросу в новой базе ничего не найдено.</p>';
                }
            }
        } else {
            $text = '<p>Задан пустой поисковый запрос.</p>';
        }

        return $text;
    }
    // info_user
    function record_user_info($query, $brows, $screen, $plug, $date, $position)
    {
        if (!empty($query)) {
            $link = mysqli_connect(DB_HOST, DB_USER, DB_PASS, 'pov')
                or die("Ошибка " . mysqli_error($link));
            // создание строки запроса
            $query_db = "INSERT INTO who_db VALUES(NULL,'$query','$date','$brows','$screen','$plug','$position','NULL')";
            // выполняем запрос
            $result = mysqli_query($link, $query_db) or die("Ошибка " . mysqli_error($link));
            mysqli_close($link);
        }
    }
    // end info_user
    if (!empty($_POST['query'])) {
        $search_result = search($_POST['query']);
        $search_result_new = search_new($_POST['query']);
        echo $search_result;
        echo $search_result_new;
    }
    if (!empty($_POST['brows'])) {
        // $tt = $_POST['brows'];
        // var_dump($tt);
        record_user_info($_POST['query'], $_POST['brows'], $_POST['screen'], $_POST['plug'], $_POST['date'], $_POST['position']);
    }
    ?>

</body>
<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>


</html>