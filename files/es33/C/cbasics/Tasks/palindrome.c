    #include <stdio.h>

    int main()
    {
        int n, temp, rev = 0, rem;

        printf("Enter a number: ");
        scanf("%d", &n);

        temp = n;

        while (temp != 0)
        {
            rem = temp % 10;
            rev = rev * 10 + rem;
            temp = temp / 10;
        }

        if (n == rev)
            printf("%d  palindrome number.\n", n);
        else
            printf("%d  not a palindrome number.\n", n);

        return 0;
    }