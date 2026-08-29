#include <stdio.h>
char *strchar(char *str, char c)
{
    char *p1 = str;
    char *last = NULL;

    while (*p1 != '\0')
    {
        if (*p1 == c)
            last = p1;
        p1++;
    }

    return last;
}
int main()
{
    char str[20];
    char c;
    fgets(str, 20, stdin);
    scanf("%c", &c);

    printf("partucular  ::%s\n", strchar(str, c));
    return 0;
}