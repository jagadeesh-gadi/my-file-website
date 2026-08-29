// program to find the string is palindrome or not
#include <stdio.h>
#include <string.h>

int main()
{
    char str[100];

    int i, j, flag = 1;
    printf("enter the string ::");
    scanf("%s", str);
    int len = strlen(str);
    for (i = 0; i < len / 2; i++)
    {
        if (str[i] != str[len - i - 1])
        {

            flag = 0;
            break;
        }
    }
    if (flag == 1)
        printf("palindrome :\n");
    else
        printf("not palindrome\n");
    return 0;
}