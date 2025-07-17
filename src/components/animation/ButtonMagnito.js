import { gsap,Power4,Elastic } from "gsap";
import { useEffect } from "react";

const ButtonMagnito = ({ children }) => {
	useEffect(() => {
		const magneto = document.querySelector(".magneto");
		const magnetoText = document.querySelector(".magneto .text");

		console.log(magneto);

		// mose move stuff
		const activateMagneto = (event) => {
			let boundBox = magneto.getBoundingClientRect();
			const magnetoStrength = 30;
			const magnetoTextStrength = 20;
			const newX = (event.clientX - boundBox.left) / magneto.offsetWidth - 0.5;
			const newY = (event.clientY - boundBox.top) / magneto.offsetHeight - 0.5;
			console.log(event);


            gsap.to(magneto,{
                duration:1,
                x: newX * magnetoStrength,
                y:newY * magnetoStrength,
                ease: Power4.easeOut
            });
            gsap.to(magnetoText,{
                duration:1,
                x: newX * magnetoTextStrength,
                y:newY * magnetoTextStrength,
                ease: Power4.easeOut
            });
		};

		//Mouse leave stuff
		const resetMagneto = (event) => {
            gsap.to(magneto,{
                duration:1,
                x:0,
                y:0,
                ease: Elastic.easeOut
            })
            gsap.to(magnetoText,{
                duration:1,
                x:0,
                y:0,
                ease: Elastic.easeOut
            })


        };

		//Add event listener

		magneto.addEventListener("mousemove", activateMagneto);
		magneto.addEventListener("mouseleave", resetMagneto);
	}, []);

	return <>{children}</>;
};

export default ButtonMagnito;