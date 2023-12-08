<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Amount</th>
            <!-- Other columns as needed -->
        </tr>
    </thead>
    <tbody>
        @foreach($transactions as $transaction)
            <tr>
                <td>{{ $transaction->id }}</td>
                <td>{{ $transaction->amount }}</td>
                <!-- Other columns -->
            </tr>
        @endforeach
    </tbody>
</table>
