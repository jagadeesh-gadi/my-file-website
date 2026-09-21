#include <stdio.h>

int main()
{
    FILE *fp = fopen("some.txt", "r");
    int ch;

    if (fp == NULL)
    {
        printf("failed to open\n");
        return 1;
    }
    // SEEK_SET --- from current positions
    fseek(fp, 2, SEEK_SET);
    ch = fgetc(fp);
    printf("seek_set :: %c\n", ch);
    // SEEK_CUR - from current positoion

    fseek(fp, 2, SEEK_CUR);
    ch = fgetc(fp);
    printf("seek_cur :: %c\n", ch);

    fseek(fp, -2, SEEK_END);
    ch = fgetc(fp);
    printf("seek_end :%c\n", ch);

    fclose(fp);
    return 0;
}