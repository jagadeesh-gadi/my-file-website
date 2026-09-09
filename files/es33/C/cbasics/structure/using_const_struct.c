#include<stdio.h>

typedef  struct{

	const int id;
	char name[30];

}sensor_t;

int main(){

const sensor_t s ={101,"ravi"};
	sensor_t s1 = {102,"jagadeesh"};
        s.id=104;
	s.name = "ramesh";
	printf(" id :: %d \n",s.id);
	printf(" id  :: %d \n",s1.id);
	printf("name :: %s\n",s.name);
	printf("name :: %s\n",s1.name);
}

