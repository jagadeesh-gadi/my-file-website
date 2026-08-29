#include <stdio.h>
#include<stdlib.h>

int main()
{
    int a, n;
    scanf("%d", &a);
    switch (1)
    {
        printf("first  one ");
        printf("second one");
        printf("third one");
        printf("fourth one");
        printf("fivth one");
        printf("sixth one");
        printf("seventh one");
        printf("eighth one");
        printf("nineth one");

        switch (a)
        {
        case 1:
            printf("Database created . . . . . \n\n");
            break;
        case 2:
            printf("Record inserted . . . . . \n\n");
            break;
        case 3:
            printf("Record modified . . . . . \n\n");
            break;
        case 4:
            printf("Record deleted . . . . . \n\n");
            break;
        case 5:
            printf("Records displayed . . . . . \n\n");
            break;
        case 6:
            exit(1);
        default:
            printf("Wrong choice\n");
            break;
        }
    }
    return 0;
}