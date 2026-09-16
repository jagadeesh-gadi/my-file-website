
#include <stdio.h>
#include <string.h>

int main()
{
    FILE *fp;
    char str[100];
    char search[100];

    fp = fopen("source.txt", "r");

    if (fp == NULL)
    {
        printf("Failed to open file\n");
        return 1;
    }

    printf("Enter word to search: ");
    scanf("%99s", search);

    while (fscanf(fp, "%99s", str) == 1)
    {
        if (strcmp(str, search) == 0)
        {
            printf("Word found\n");
            fclose(fp);
            return 0;
        }
    }

    printf("Word not found\n");

    fclose(fp);

    return 0;
}
