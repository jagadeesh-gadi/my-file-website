#include <stdio.h>

int main()
{
    char ch;
    scanf("%c",&ch);
    if (ch >= 'A' && ch <= 'Z')
    {
        printf("charater is UPPER CASE ::  %d , %c\n", ch,ch);
    }
    else if (ch >= 'a' && ch <= 'z')

    {
        printf("charater is lower case :: %d , %c\n", ch,ch);
    }
    else if (ch >= '0' && ch <= '9')
    {
        printf("digits %c\n", ch);
    }
    else
    {
        printf("special character %c\n", ch);
    }
    return 0;
}