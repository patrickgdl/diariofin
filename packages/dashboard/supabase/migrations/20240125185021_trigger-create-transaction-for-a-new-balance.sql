-- Create a trigger function to create a transaction when a new account with balance is created
CREATE OR REPLACE FUNCTION public.create_transaction_for_new_account_balance() 
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the amount is greater than zero
    IF NEW.balance > 0 THEN
        DECLARE
            new_transaction_id UUID;
        BEGIN
            -- Generate a new UUID for the transaction
            new_transaction_id := extensions.gen_random_uuid();

            -- Create the transaction based on account creation
            INSERT INTO transactions (
                id,
                amount,
                description,
                type_id,
                account_id,
                category_id,
                client_id,
                is_recurring,
                start_date
            )
            VALUES (
                new_transaction_id,
                NEW.balance,
                'Saldo inicial',
                1,
                NEW.id,
                'c5aee89c-f7ca-430d-ba9e-d9a90ada09d7',
                null,
                false,
                CURRENT_TIMESTAMP
            );

            -- Create the transactions_instance as done
            INSERT INTO transactions_instance (
                transaction_id,
                is_rescheduled,
                is_canceled,
                is_done,
                start_date
            )
            VALUES (
                new_transaction_id,
                false,
                false,
                true,
                CURRENT_TIMESTAMP
            );

        EXCEPTION
            WHEN others THEN
                -- Handle exceptions if the insert fails
                -- TODO: log the error
                RAISE WARNING 'Failed to create transaction balance for account id %, error: %', NEW.id, SQLERRM;
        END;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to execute the function after a new account with balance is inserted
CREATE TRIGGER on_account_created
AFTER INSERT ON public.account
FOR EACH ROW EXECUTE FUNCTION public.create_transaction_for_new_account_balance();
