<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sua consulta foi agendada!</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f9;
            color: #333;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            margin-top: 50px;
        }

        h1 {
            font-size: 24px;
            color: #4CAF50;
            text-align: center;
            margin-bottom: 20px;
        }

        p {
            font-size: 16px;
            color: #555;
            text-align: center;
            margin-bottom: 20px;
        }

        .details {
            font-size: 16px;
            margin-bottom: 20px;
        }

        .details li {
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }

        .footer {
            font-size: 14px;
            text-align: center;
            color: #888;
            margin-top: 30px;
        }

        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: #fff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 4px;
            text-align: center;
            margin: 20px 0;
        }

        .button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Sua consulta foi agendada com sucesso!</h1>
        <p>Estamos felizes em confirmar o agendamento da sua consulta. Confira os detalhes abaixo:</p>

        <ul class="details">
            <li><strong>Data e Hora:</strong> {{ $appointmentDate }}</li>
            <li><strong>Paciente:</strong> {{ $pacienteName }}</li>
            <li><strong>Médico:</strong> {{ $medicoName }}</li>
        </ul>

        <div class="footer">
            <p>Se você tiver dúvidas, entre em contato com nossa equipe.</p>
            <p>Obrigado por escolher a Medicca!</p>
        </div>
    </div>
</body>
</html>
