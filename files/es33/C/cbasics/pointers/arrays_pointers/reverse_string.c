#include <stdio.h>
void strrev(char *str)
{
    char *start = str;
    char *end = str;
    char temp;
    while (*end != '\0')
        end++;
    end--;
    while (start < end)
    {
        temp = *start;
        *start = *end;
        *end = temp;
        start++;
        end--;
    }
}
int main()
{
    char str[20];
    printf("enter string :: ");
    fgets(str, 20, stdin);
    strrev(str);
    printf("reverse the string :: %s\n", str);
    return 0;
}