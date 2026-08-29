#include <stdio.h>
char *substr(char *arr1, char *arr2)
{
    char *p1;
    char *p2;
    int i = 0;
    while (arr2[i] != '\0')
    {
        if (arr2[i] == '\n')
        {
            arr2[i] = '\0';
            break;
        }
        i++;
    }
    while (*p1 != '\0')
    {
        p1 = arr1;
        p2 = arr2;

        while (*p1 == *p2 && *p2 != '\0')
        {
            p1++;
            p2++;
        }
        if (*p2 == '\0')
        {
            return arr1;
        }
        arr1++;
    }

    return NULL;
}
int main()
{

    char str1[20];
    char str2[20];
    fgets(str1, 20, stdin);
    fgets(str2, 20, stdin);

    printf("substring values :: %s\n", substr(str1, str2));
    return 0;
}