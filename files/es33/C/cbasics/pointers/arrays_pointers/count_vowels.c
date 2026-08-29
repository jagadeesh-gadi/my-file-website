#include <stdio.h>
int i;
void constants(char *arr)
{
    int count = 0;
    char *p = arr;
    while (*p != '\0')
    {
        if ((*p >= 'a' && *p <= 'z') ||
            (*p >= 'A' && *p <= 'Z'))
        {
            if (*p != 'a' && *p != 'e' && *p != 'i' &&
                *p != 'o' && *p != 'u' &&
                *p != 'A' && *p != 'E' && *p != 'I' &&
                *p != 'O' && *p != 'U')
            {
                count++;
            }
        }

        p++;
    }
    printf("consoants count :: %d\n", count);
}
void vowels(char *arr)
{
    int count = 0;
    char *p = arr;
    while (*p != '\0')

    {
        if (*p == 'a' || *p == 'e' || *p == 'i' ||
            *p == 'o' || *p == 'u' ||
            *p == 'A' || *p == 'E' || *p == 'I' ||
            *p == 'O' || *p == 'U')

            count++;
        p++;
    }
    printf("vowels count :: %d\n", count);
}

void digits(char *arr)
{
    int count = 0;
    char *p = arr;
    while (*p != '\0')
    {
        if (*p >= '0' && *p <= '9')

            count++;

        p++;
    }
    printf("digits count :: %d\n", count);
}
int main()
{
    char arr[30];
    fgets(arr, 30, stdin);
    printf("counting of all values :: \n");
    constants(arr);
    vowels(arr);
    digits(arr);
    return 0;
}