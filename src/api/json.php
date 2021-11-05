<?php

$method = $_SERVER["REQUEST_METHOD"];
// $data = array(
//     array("id" => "11", "name" => 'Dr Nice1'),
//     array("id" => "12", "name" => 'Narco2'),
//     array("id" => "13", "name" => 'Bombasto'),
//     array("id" => "14", "name" => 'Celeritas'),
//     array("id" => "15", "name" => 'Magneta')
// );

// 파일 열기
$file = "database.txt";
$fp = fopen($file, "r") or die("파일을 열 수 없습니다！");
// 파일 내용 출력
while (!feof($fp)) {
    $data[] =  json_decode(fgets($fp), true);
}

$putdata = json_decode(file_get_contents("php://input"));


// 히어로 수정
if ($method === "PUT" && $putdata->id && $putdata->name) {
    $id = $putdata->id;
    $name = $putdata->name;
    $key_id = array_column($data, 'id');
    $search = array_search($id, $key_id);
    if ($search !== false) {
        $data[$search]["name"] = $name;

        $txt = "";
        $i = 1;
        $length = count($data);
        foreach ($data as $item) {
            if ($i === $length) {
                $txt .= json_encode($item, JSON_UNESCAPED_UNICODE);
            } else {
                $txt .= json_encode($item, JSON_UNESCAPED_UNICODE) . "\r\n";
            }
            $i++;
        }
        $fp = fopen($file, "w") or die("파일을 열 수 없습니다！");
        fputs($fp, $txt);
    }
    // 히어로 상세보기
} else if ($method === "GET" && $_GET['id']) {
    $id = $_GET['id'];
    $key_id = array_column($data, 'id');
    $search = array_search($id, $key_id);
    if ($search !== false) {
        $data = $data[$search];
    }
    // 히어로 새로운 저장
} else if ($method === "POST" && !$putdata->id && $putdata->name) {
    /* 마지막 id 번호 가져오기 */
    $txt = "";
    $i = 1;
    $length = count($data);
    $last_id = "";
    foreach ($data as $item) {
        if ($i === $length) {
            $last_id = $item['id'];
        }
        $i++;
    }
    /* 마지막 id 번호 가져오기 */
    $new_id = (int)$last_id + 1;
    //입력된 데이터 저장
    $data_new = array("id" => $new_id, "name" => $putdata->name);
    // 입력된 데이터 배열에 저장
    $data[] = $data_new;

    // 파일 쓰기
    $txt = "";
    $i = 1;
    $length = count($data);
    foreach ($data as $item) {
        if ($i === $length) {
            $txt .= json_encode($item, JSON_UNESCAPED_UNICODE);
        } else {
            $txt .= json_encode($item, JSON_UNESCAPED_UNICODE) . "\r\n";
        }
        $i++;
    }
    $fp = fopen($file, "w") or die("파일을 열 수 없습니다！");
    fputs($fp, $txt);

    //입력된 데이터 json 보내기
    $data = $data_new;
} else if ($method === "DELETE") {
    $id = $_GET['id'];
    $key_id = array_column($data, 'id');
    $search = array_search($id, $key_id);
    array_splice($data, $search, 1);


    // 파일 쓰기
    $txt = "";
    $i = 1;
    $length = count($data);
    foreach ($data as $item) {
        if ($i === $length) {
            $txt .= json_encode($item, JSON_UNESCAPED_UNICODE);
        } else {
            $txt .= json_encode($item, JSON_UNESCAPED_UNICODE) . "\r\n";
        }
        $i++;
    }
    $fp = fopen($file, "w") or die("파일을 열 수 없습니다！");
    fputs($fp, $txt);
}
fclose($fp);
echo json_encode($data, JSON_UNESCAPED_UNICODE);
