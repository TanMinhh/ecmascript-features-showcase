# A - Atomicity (All or Nothing)
The combination of starting the transaction, committing it at the end, and aborting it in the catch block demonstrates Atomicity.  
If deducting funds from the first account succeeds but adding them to the second account fails (such as a network timeout or server error), the catch block executes.  
The transaction aborts, and neither change is saved to the database.  

# C - Consistency (Valid State)
The business logic inside the update operations demonstrates Consistency.  
By deducting exactly 500 from one account and adding exactly 500 to the other, the total sum of money across both accounts remains identical before and after the execution.  
The database state remains valid according to the rules of the system.

# I - Isolation (Invisible In-Progress States)
Passing the session object into the updateOne methods demonstrates Isolation.  
While the transaction is actively executing, the intermediate state is hidden.  
If another user queries the database right after the first account is deducted but before the second is credited, they will not see the missing 500.  
They will only see the old balances until the transaction fully commits.

# D - Durability (Permanent Storage)
The successful resolution of the commit operation demonstrates Durability.  
Once this specific method finishes successfully, the MongoDB replica set guarantees that the changes are written to the database's permanent journal.  
If the server loses power a millisecond later, the transfer will still be there when the database restarts.