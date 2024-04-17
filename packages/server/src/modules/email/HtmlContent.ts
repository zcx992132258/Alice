export function RegisterHtmlContent(link: string) {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Alice</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(to right, #2980b9, #6dd5fa);
        }

          #alice-container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            padding: 30px;
            text-align: center;
        }

        #alice-container   h1 {
            color: #333333;
            margin-bottom: 20px;
        }

        #alice-container  p {
            color: #666666;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        #alice-container  .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        #alice-container .btn:hover {
            background-color: #45a049 !important;
        }
    </style>
</head>

<body>
   <div style="background: linear-gradient(to right, #2980b9, #6dd5fa);padding:40px">
   <div class="container" id="alice-container">
   <h1>欢迎使用 Alice</h1>
   <p>谢谢你选择Alice。我们很高兴你能加入我们!</p>
   <a href="${link}" onclick="handleClick()" class="btn">加入alice</a>
</div>
   </div>
</body>
<script>
function handleClick() {
  window.open('${link}')
}
</script>
</html>
`
}
