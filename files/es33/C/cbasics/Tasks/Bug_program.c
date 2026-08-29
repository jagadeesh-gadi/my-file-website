#include <stdio.h>

int main()
{
    int marks;
    scanf("%d",&marks);
    char grade;
    if(marks>=90){
        grade ='A';
    }
    else if(marks>=75){
        grade ='A';
    }
    else if(marks >=60){
        grade = 'C';
    }
    else{
        grade = 'A';
    }
    return 0;
}